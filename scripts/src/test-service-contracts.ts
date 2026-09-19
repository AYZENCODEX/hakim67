import assert from "node:assert/strict";
import {
  DOMAIN_SERVICE_CONTRACTS,
  getServiceDescriptor,
} from "../../artifacts/api-server/src/lib/domain-service-contracts";
import {
  signServiceRequest,
  verifyServiceSignature,
  hashRequestBody,
} from "../../artifacts/api-server/src/lib/service-to-service-security";
import { assertTableOwnedBy, getTableOwner } from "../../artifacts/api-server/src/lib/service-boundaries";

const secret = "contract-test-secret";
const signatureInput = {
  service: "finance",
  method: "POST",
  path: "/internal/finance/ledger",
  timestamp: Date.now(),
  requestId: "request-1",
  body: { amount: 10, currency: "USD" },
};

function test(name: string, fn: () => void | Promise<void>): Promise<void> {
  return Promise.resolve().then(fn).then(
    () => console.log(`  ok — ${name}`),
    (error) => {
      console.error(`  FAIL — ${name}`);
      throw error;
    },
  );
}

async function main(): Promise<void> {
  console.log("Roadmap phases 10-25 — service contract tests");

  await test("every declared service has an extraction descriptor and contract", () => {
    assert.equal(DOMAIN_SERVICE_CONTRACTS.length, 15);
    for (const contract of DOMAIN_SERVICE_CONTRACTS) {
      assert.ok(getServiceDescriptor(contract.service));
      assert.ok(contract.capabilities.length > 0);
      assert.ok(contract.tables.length > 0);
      assert.equal(contract.qualityGates.length, 9);
    }
  });

  await test("database ownership is explicit and rejects cross-service access", () => {
    assert.equal(getTableOwner("finance_ledger_entries"), "finance");
    assert.doesNotThrow(() => assertTableOwnedBy("finance", "finance_ledger_entries"));
    assert.throws(
      () => assertTableOwnedBy("vault", "finance_ledger_entries"),
      /Database boundary violation/,
    );
  });

  await test("service signatures are deterministic and tamper-evident", () => {
    const timestamp = String(signatureInput.timestamp);
    const bodyHash = hashRequestBody(signatureInput.body);
    const signature = signServiceRequest({
      service: signatureInput.service,
      timestamp,
      requestId: signatureInput.requestId,
      bodyHash,
      secret,
    });
    assert.equal(verifyServiceSignature({
      service: signatureInput.service,
      timestamp,
      requestId: signatureInput.requestId,
      bodyHash,
      signature,
      secret,
    }), true);
    assert.equal(
      verifyServiceSignature({
        service: signatureInput.service,
        timestamp,
        requestId: signatureInput.requestId,
        bodyHash: hashRequestBody({ amount: 11, currency: "USD" }),
        signature,
        secret,
      }),
      false,
    );
    assert.equal(verifyServiceSignature({
      service: signatureInput.service,
      timestamp,
      requestId: signatureInput.requestId,
      bodyHash,
      signature,
      secret: "wrong-secret",
    }), false);
  });

  await test("service request body hashing is key-order independent", () => {
    assert.equal(
      hashRequestBody({ amount: 10, currency: "USD" }),
      hashRequestBody({ currency: "USD", amount: 10 }),
    );
  });
}

main().catch(() => process.exitCode = 1);
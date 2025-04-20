// app/withdraw/page.jsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/utils/wallet";
import { getUserShareValue, withdrawShares } from "@/utils/contract_interface";

export default function WithdrawPage() {
  const { account, connectWallet } = useWallet();
  const [userShareValue, setUserShareValue] = useState(0);
  const [amountToWithdraw, setAmountToWithdraw] = useState("");

  useEffect(() => {
    if (account) {
      getUserShareValue(account).then(setUserShareValue);
    }
  }, [account]);

  const handleWithdraw = async () => {
    if (!amountToWithdraw || isNaN(amountToWithdraw)) return;
    await withdrawShares(account, parseFloat(amountToWithdraw));
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <Card className="p-6 shadow-md">
        <CardContent>
          <h2 className="text-2xl font-semibold mb-4">Withdraw Funds</h2>

          {!account ? (
            <Button onClick={connectWallet}>Connect Wallet</Button>
          ) : (
            <>
              <p className="mb-4 text-gray-600">
                Current share value: <strong>${userShareValue.toFixed(2)}</strong>
              </p>

              <Input
                placeholder="Amount to withdraw (USD)"
                value={amountToWithdraw}
                onChange={(e) => setAmountToWithdraw(e.target.value)}
                className="mb-4"
              />

              <Button onClick={handleWithdraw}>Confirm Withdrawal</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

import { formatCurrency } from "@/src/utils";

type AmountProps = {
  label: string;
  amount: number;
};

export const Amount = ({ label, amount }: AmountProps) => {
  return (
    <p className="text-xl font-bold text-slate-600">
      {label}:{"  "}
      <span className="text-green-600">{formatCurrency(amount)}</span>
    </p>
  );
};

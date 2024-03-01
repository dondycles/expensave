import { useOptimisticAddMoney } from "@/store";

export default function MoneyCardOptimistic() {
  const optismiticAddMoney = useOptimisticAddMoney();
  const isPendingMoney =
    optismiticAddMoney.amount && optismiticAddMoney.name ? true : false;

  return (
    <div
      className={`rounded-[0.5rem] border p-2  animate-pulse ${
        isPendingMoney ? "flex justify-between" : "hidden"
      }`}
    >
      <p>{optismiticAddMoney.name}</p>
      <p>{optismiticAddMoney.amount}</p>
    </div>
  );
}

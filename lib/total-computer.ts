var _ = require("lodash");
export const totalComputer = ({
  data,
  type,
}: {
  data: any[] | null | undefined;
  type: "expenses" | "savings";
}) => {
  if (data === undefined) return 0;
  if (!data) return 0;
  if (type === "expenses") {
    const total = _.sum(data?.map((d: { cost: any }) => Number(d.cost)));
    const average = total / data?.length;
    return total;
  }
  if (type === "savings") {
    const total = _.sum(data?.map((d: { amount: any }) => Number(d.amount)));
    const average = total / data?.length;
    return total;
  }
};

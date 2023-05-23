import type { FC } from "react";

type Props = {
  data: Array<Record<string, string>>;
};

export const TracksTable: FC<Props> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full table-compact">
        <tbody className="!border-0 !border-none">
          {data?.map((item, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              {Object?.values(item).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

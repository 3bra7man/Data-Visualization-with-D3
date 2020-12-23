import { useLegend } from "./Legend.hook";

export const Legend = ({ id, items = [] }) => {
    useLegend({ id, items });
    return (
        <div className="legendWrapper">
            <svg id={id} width={500} height={50 + (25 * items.length)}/>
        </div>
    );
}
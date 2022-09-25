import {SupplyItem} from "../components/SupplyItem";
import {SuppliesList, Supply} from "../utils/types";

export const Supplies = ({supplies}: SuppliesList) => {
    return (
        <div className="supplies">
            <h1 className="supplies_header header">Supplies</h1>
            <div className="supplies_list">
                {supplies.map(({id,name}: Supply) => {
                    return <SupplyItem itemId={id} key={id} name={name}/>;
                })}
            </div>
        </div>
    )
}

export default Supplies;
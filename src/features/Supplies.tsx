import {SupplyItem} from "../components/SupplyItem";
import {suppliesData} from "../utils/fakeData";

export const Supplies = () => {
    return (
        <div className="supplies">
            <h1 className="supplies_header header">Supplies</h1>
            <div className="supplies_list">
                {suppliesData.map(({id,name}) => {
                    return <SupplyItem itemId={id.toString()} key={id} name={name}/>;
                })}
            </div>
        </div>
    )
}

export default Supplies;
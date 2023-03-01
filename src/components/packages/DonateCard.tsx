import {Column} from "components/structural/Grid";
import Button   from "components/visual/Button";
import React    from "react";
import "./packages.scss";

export type DonateItem = {
    _id?: string;
    id?: string;
    title: string;
    price: number;
    originalPrice?: number;
    leftPrice?: number;
    benefits: string[];
    total: number;
    index?: number;
    priceId?: string;
    donateHandler: (id?: string, priceId?: string) => void;
    leftCount?: number;
};

const DonateCard = ({id, title, price, originalPrice, leftPrice, benefits, total, index, priceId, donateHandler}: DonateItem) => {
    const [amount, setAmount] = React.useState(0);
    const [edit, setEdit] = React.useState(false);
    return (
        <Column className="package">
            <h3 className={`package-title`}>{title}</h3>
            <ul className="package-benefits">
                {benefits.map((item, i) => (
                    <li key={i} className={`package-benefit ${i <= total ? "package-benefit-check" : "package-benefit-cross"}`}>
                        <img className="benefit-check" src={`/img/${i <= total ? "check.svg" : "cross.svg"}`} alt="alt" />
                        {item}
                    </li>
                ))}
            </ul>
            <p className={`package-price`}>
                <span className={`package-price-original`}>
                    {originalPrice ? "$" : ""}
                    {originalPrice}
                </span>
                <span className={`package-price-now`}>
                    {price}
                </span>
            </p>
            {edit && (
                <div>
                    <input className="form-control  bg-transparent form-input__feild" type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value, 10))} min="0" />
                </div>
            )}
            {leftPrice && (
                <p className={"package-number-left"}>{leftPrice} left at this price</p>
            )}
            <Button
                onClick={() => {
                    setEdit(false);
                    donateHandler(id, priceId);
                    setAmount(0);
                }}
                className="package-button"
                color={"primary"}
            >
                Choose
            </Button>
        </Column>
    );
};

export default DonateCard;

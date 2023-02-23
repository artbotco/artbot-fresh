/* eslint-disable react/prop-types */
import React from "react";
import Helpers from "../../Helpers";
// import ReactIcons from '../UI/ReactIcons/ReactIcons';
import ReactIcons from "assets/ReactIcons";

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

const DonateCard = ({ id, title, price, originalPrice, leftPrice, benefits, total, index, priceId, donateHandler }: DonateItem) => {
    const [amount, setAmount] = React.useState(0);
    const [edit, setEdit] = React.useState(false);
    return (
        <div className="much-donate-card">
            <p className="much-donate-card--title">{title}</p>
            {benefits.map((item, i) => (
                <div key={i} className="d-flex much-donate-card-inner align-items-center1 ">
                    <img className="much-donate-card--check" src={`/img/${i <= total ? "check.svg" : "cross.svg"}`} alt="alt" />
                    <p className={`mb-0 ${i <= total ? "much-donate-card-inner--active" : "much-donate-card-inner--disable"}`}>&nbsp; {item}</p>
                </div>
            ))}
            <div className="d-flex justify-content-center align-items-center">
                <p className="much-donate-card--original ">
                    {originalPrice ? "$" : ""}
                    {originalPrice}
                </p>
                &nbsp;&nbsp;
                <p className="much-donate-card--price">${price}</p>
                {/* <ReactIcons.FaEdit
                    size={20}
                    className="pointer mx-2 mb-3"
                    onClick={() => setEdit(!edit)}
                /> */}
            </div>
            {edit && (
                <div>
                    <input className="form-control  bg-transparent form-input__feild" type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value, 10))} min="0" />
                </div>
            )}
            <p className={Helpers.getClasses(`much-donate-card--left`, index === 0 ? "opacity-0" : "")}>{leftPrice} left at this price</p>
            <button
                onClick={() => {
                    setEdit(false);
                    donateHandler(id, priceId);
                    setAmount(0);
                }}
                className="much-donate-card--btn btn rounded-pill"
            >
                Choose
            </button>
        </div>
    );
};

export default DonateCard;

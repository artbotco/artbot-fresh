/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
// import ReactIcons from '../UI/ReactIcons/ReactIcons';
const DonateCard = ({ id, title, price, originalPrice, leftPrice, benefits, total, index, priceId, donateHandler }) => {
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
                    <input className="form-control  bg-transparent form-input__feild" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} min="0" />
                </div>
            )}
            <p className={`much-donate-card--left ${clsx({ "opacity-0": index === 0 })}`}>{leftPrice} left at this price</p>
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

DonateCard.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.number,
    originalPrice: PropTypes.number,
    leftPrice: PropTypes.number,
    benefits: PropTypes.array,
    total: PropTypes.number,
};

export default DonateCard;

import { changeBacking } from "_redux/reducers/auth.duck";
import React, { LegacyRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlans } from "services/movie";
import { useRouter } from "services/Router";
import { createFundingPaymentHistory } from "services/util";
import DonateCard, { DonateItem } from "./DonateCard";
import packages from "./packages";
import "./packages.scss";

const LetsMakeaMovie = () => {
    const formRef: LegacyRef<any> = React.useRef();
    const user = useSelector((state: any) => state.auth);
    const [price, setPrice] = React.useState(0);
    const router = useRouter();

    const [openModel, setOpenModel] = React.useState({
        message: "",
        open: false,
        login: false,
        parse: false,
    });

    const dispatch = useDispatch();

    // const [packages, setPackages] = React.useState(packages.plans);
    React.useEffect(() => {
        // getVotes();
        // getPlans();
    }, []);

    // const getPlans = async () => {
    //     const data = await getAllPlans();
    //     if (data.code === "ABT0000") setPackages([...data.plans]);
    // };
    React.useEffect(() => {
        const { success } = router.query;
        const pay = JSON.parse(localStorage.getItem("pay") ?? "[]");
        if (success && pay) {
            localStorage.setItem("pay", "false");
            setOpenModel({
                ...openModel,
                open: true,
                parse: true,
                message:
                    "<p className='mb-0'>Thanks for taking the first step in helping us #letsmakeamovie.</p><p className='mb-0'> Please check your email and spam for your private discord invite.</p><p className='mb-0'> Let's make something amazing!</p>",
            });
            createPaymentHistory();
        }
    }, []);

    React.useEffect(() => {
        if (!price) {
            return;
        }
        const plan = packages.plans.find(({ priceId }) => parseInt(priceId, 10) === price);
        if (!plan) {
            return;
        }
        localStorage.setItem("pay", "true");
        localStorage.setItem("price", plan["price"] as unknown as string);
        localStorage.setItem("planId", plan["_id"] as string);
        localStorage.setItem("planTitle", plan["title"] as string);

        setTimeout(() => {
            if (!formRef || !formRef.current) {
                return;
            }
            return (formRef.current as HTMLFormElement).submit();
        }, 1000);
    }, [price]);

    const donateHandler = (id?: string, price?: number | undefined | string) => {
        if (!user.authToken) {
            console.log("not logged in");
            return;
        }
        setPrice(price as number);
        // setSelectedPlan(id);
        // formRef.current.submit();
    };
    const createPaymentHistory = async () => {
        const price = localStorage.getItem("price");
        const planId = localStorage.getItem("planId");
        const planTitle = localStorage.getItem("planTitle");
        const reqData = {
            transactionId: "",
            paymentMethod: "stripe",
            paid: true,
            email: user.user.email,
            user: user.user._id,
            payTo: "5f0de0fb57fce500203473bb",
            amount: price,
            paymentFor: "croudfunding",
            planId: planId,
        };
        dispatch(changeBacking(price, planTitle));
        localStorage.removeItem("price");
        localStorage.removeItem("planId");
        localStorage.removeItem("planTitle");
        await createFundingPaymentHistory(reqData);
        // getPlans();
    };

    let fragment: JSX.Element = (
        <>
            <React.Fragment>
                {/* How much donate */}
                <div className="container">
                    <p className="packages-title">
                        How much do you want to back
                        <span className="lets-make-movie--fact">?</span>
                    </p>
                    <div className="package-container">
                        {packages.plans.map((item, i: number) => {
                            return (
                                <div key={i} className="col-md-4">
                                    <DonateCard
                                        id={item._id}
                                        index={i}
                                        priceId={item.priceId}
                                        title={item.title}
                                        price={item.price}
                                        originalPrice={item.originalPrice}
                                        total={item.total}
                                        benefits={item.benefits}
                                        leftPrice={item.leftCount}
                                        donateHandler={donateHandler}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="opacity-0">
                        <form ref={formRef} action="https://artbot-backend-api-9v7k9.ondigitalocean.app/api/plan/openStripe" method="POST">
                            <input type="hidden" value={price} name="priceId" />
                            <button type="submit">Checkout</button>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        </>
    );
    return fragment;
};

export default LetsMakeaMovie;

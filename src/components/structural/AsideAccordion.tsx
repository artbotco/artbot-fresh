import React, { useState } from "react";
import { LEARN_MORE_CONTENTS } from "constants/learn-more";
import { Accordion, AccordionDetails, AccordionSummary, MenuItem } from "@mui/material";
import Aside from "./Aside";
import "./AsideAccordion.scss";
import { FaMinus, FaPlus } from "react-icons/fa";

interface IAsideAccordion {
    id: string;
}

const AsideAccordion: React.FC<IAsideAccordion> = ({ id }) => {
    return (
        <Aside id={id}>
            <h1>{LEARN_MORE_CONTENTS[id].title}</h1>
            <div className="aside-content">
                {LEARN_MORE_CONTENTS[id].contents.map((item: any, idx: number) => (
                    <AccordionItem item={item} key={idx} />
                ))}
            </div>
        </Aside>
    );
};

interface IAccordionItem {
    item: any;
}

const AccordionItem: React.FC<IAccordionItem> = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (_event: any, _expanded: boolean) => {
        setExpanded(_expanded);
    };

    return (
        <Accordion className="aside-accordion" expanded={expanded} onChange={handleChange}>
            <AccordionSummary className="aside-accordion-summary">
                {expanded ? <FaMinus size={12} /> : <FaPlus size={12} />}
                &nbsp;
                {item.title}
            </AccordionSummary>
            <AccordionDetails>
                {item.detail.map((c: any, index: number) => (
                    <MenuItem className="aside-accordion-item" key={index}>
                        {c}
                    </MenuItem>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default AsideAccordion;

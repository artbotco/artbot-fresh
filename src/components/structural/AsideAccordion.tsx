import React from "react";
import { LEARN_MORE_CONTENTS } from "constants/learn-more";
import { Accordion, AccordionDetails, AccordionSummary, MenuItem } from "@mui/material";
import Aside from "./Aside";
import "./AsideAccordion.scss";

interface IAsideAccordion {
    id: string;
}

const AsideAccordion: React.FC<IAsideAccordion> = ({ id }) => {
    return (
        <Aside id={id}>
            <h1>{LEARN_MORE_CONTENTS[id].title}</h1>
            <div className="aside-content">
                {LEARN_MORE_CONTENTS[id].contents.map((item: any, idx: number) => (
                    <Accordion className="aside-accordion" key={idx}>
                        <AccordionSummary>{item.title}</AccordionSummary>
                        <AccordionDetails>
                            {item.detail.map((c: any, index: number) => (
                                <MenuItem className="aside-accordion-item" key={index}>
                                    {c}
                                </MenuItem>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </Aside>
    );
};

export default AsideAccordion;

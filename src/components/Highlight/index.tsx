import React from "react";
import { Container, Title, SubTitle } from "./style";

interface Props {
    title: string;
    subTitle: string;
}

function Highlight ({ title, subTitle}: Props) {
    return (
        <Container>
            <Title>
                {title}
            </Title>
            <SubTitle>
                {subTitle}
            </SubTitle>
        </Container>
    )
}

export { Highlight }
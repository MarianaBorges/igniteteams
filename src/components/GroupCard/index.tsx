import { TouchableOpacityProps } from "react-native";
import React from "react";
import { Container, Icon, Title } from "./styles";

interface Props extends TouchableOpacityProps{
    title: string;
}

function GroupCard({ title, ...rest }: Props){
    return(
        <Container {...rest}>
            <Icon />
            <Title>
                {title}
            </Title>
        </Container>
    )
}

export { GroupCard }
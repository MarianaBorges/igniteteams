import { Container, Logo } from "./styles";
import { CaretLeft} from 'phosphor-react-native'

import logoImage from '@assets/logo.png';

export function Header(){
    return (
        <Container>
            <CaretLeft color="#FFF" size={32} />
            <Logo source={logoImage} />
        </Container>
    )
}
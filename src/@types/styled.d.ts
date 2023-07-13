import 'styled-components/native';
import theme from '../theme';

declare module 'styled-compenents' {
    type ThemeType = typeof theme;

    export interface DefaultTheme extends ThemeType {}
}
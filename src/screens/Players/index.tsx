import { useState } from "react";
import { FlatList } from "react-native";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { useRoute } from "@react-navigation/native";

interface RouteParams {
    group: string;
}

export function Players() {

    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState([]);
    const routes = useRoute();
    const { group } = routes.params as RouteParams;

    return(
        <Container>
            <Header showBackButton/>
            <Highlight 
                title={group}
                subTitle="Adicione a galera e separe os times"
            />
            <Form>
                <Input 
                    placeholder="Nome da pessoa" 
                    autoCorrect={false}
                />
                <ButtonIcon icon="add" />
            </Form>
            <HeaderList>
                <FlatList
                    data={['Time A', 'Time B']}
                    keyExtractor={item => item}
                    renderItem={({item})=> (
                        <Filter
                            title={item}
                            isActive={team === item ? true : false}
                            onPress={() => setTeam(item)}
                        />)}    
                    horizontal
                />
                <NumbersOfPlayers>
                    {players.length}
                </NumbersOfPlayers>
            </HeaderList>
            <FlatList
                data={players}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <PlayerCard onRemove={() => {}} name={item} />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty message='Não há pessoas nesse time'/>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[{ paddingBottom: 100}, players.length === 0 && { flex: 1 }]}

            />
            <Button 
                title="Remover turma"
                type="SECUNDARY"
            />
        </Container>
    )
}
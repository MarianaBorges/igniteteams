import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, TextInput, TextInputProps } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppError } from "@utils/AppError";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";

import { Highlight } from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import { Header } from "@components/Header";

import { Container, Form, HeaderList, NumbersOfPlayers } from "./styles";

interface RouteParams {
    group: string;
}

export function Players() {

    const [newPlayerName, setNewPlayerName] = useState('');
    const [team, setTeam] = useState('Time A');
    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
    const routes = useRoute();
    const { group } = routes.params as RouteParams;

    const { navigate } = useNavigation();

    const newPlayerNameInputRef = useRef<TextInputProps>(null);

    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0) {
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa');
        }

        const newPlayer = {
            name: newPlayerName,
            team
        }

        try {
            await playerAddByGroup(newPlayer, group);
            {/** @ts-ignore */}
            newPlayerNameInputRef.current?.blur();

            setNewPlayerName('');
            fetchPlayersByTeam();
        } catch (error) {
            if (error instanceof AppError) {
                Alert.alert('Nova pessoa', error.message)
            } else {
                Alert.alert('Novo pessoa', 'Não foi possível adicionar uma nova pessoa')
                console.error(error)
            }
        }
    }

    async function fetchPlayersByTeam() {
        try {
            const playersByTeam = await playersGetGroupAndTeam(group, team);
            setPlayers(playersByTeam)
        } catch (error) {
            console.error(error);
            Alert.alert('Novo pessoa', 'Não foi possível carregar as pessoas')
        }
    }

    async function handlePlayerRemuve(playerName: string){
        try {
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam();
        } catch (error) {
            console.error(error);
            Alert.alert('Remover pessoa', 'Não foi possível remover pessoa')
        }
    }

    async function groupRemove(){
        try {
            await groupRemoveByName(group);
            navigate('groups')
        } catch (error) {
            console.error(error);
            Alert.alert('Remover grupo', 'Não foi possível remover o grupo')
        }
    }

    async function handleGroupRemove() {
        Alert.alert(
            'Remover',
            'Deseja remover o grupo?',
            [
                { text: 'Não', style: 'cancel' },
                { text: 'Sim', onPress: () => groupRemove()}
            ] 
        )
    }

    useEffect(() => {
        fetchPlayersByTeam();
    }, [team])

    return(
        <Container>
            <Header showBackButton/>
            <Highlight 
                title={group}
                subTitle="Adicione a galera e separe os times"
            />
            <Form>
                <Input 
                    inputRef={newPlayerNameInputRef}
                    placeholder="Nome da pessoa" 
                    autoCorrect={false}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    onSubmitEditing={handleAddPlayer}
                />
                <ButtonIcon icon="add" onPress={handleAddPlayer}/>
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
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <PlayerCard onRemove={() => handlePlayerRemuve(item.name)} name={item.name} />
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
                onPress={handleGroupRemove}
            />
        </Container>
    )
}
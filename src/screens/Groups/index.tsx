import { FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GroupCard';
import { useCallback, useState } from 'react';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { groupsGetAll } from '@storage/group/groupGetAll';

import { Container } from './styles';

export function Groups() {

  const [groups, setGroups] = useState<string[]>([]);
  const { navigate } = useNavigation()

  function handleNewGroup() {
    navigate('newGroup');
  }

  async function fetchGroups() {
    try {
      const data = await groupsGetAll();
      setGroups(data);
    } catch (error) {
      console.error(error)
    }
  }

  function handleOpenGroup(group: string){
    navigate('players', { group })
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    },[])
  )

  return (
    <Container>
      <Header/>

      <Highlight 
        title='Turmas'
        subTitle='Jogue com a sua turma'
      />

      <FlatList 
        data={groups}
        keyExtractor={(item) => item}
        contentContainerStyle={groups.length === 0 && {flex: 1}}
        renderItem={({item}) => (
          <GroupCard 
            title={item} 
            onPress={() => handleOpenGroup(item)}
          />
        )}
        ListEmptyComponent={() => <ListEmpty message='Que tal cadastrar a primeira Turma?'/>}
      />

      <Button title='Criar nova turma' onPress={handleNewGroup} />
    </Container>
  );
}

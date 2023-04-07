import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import { Grid, MenuItem, Select } from '@mui/material';
import { PeopleOutline } from '@mui/icons-material';
import useSWR from 'swr';

import { tesloApi } from '@/api';
import { AdminLayout } from '@/components/layouts';
import { FullScreenLoading } from '@/components/ui';
import { IUser } from '@/interfaces';




const Users: NextPage = ({}) => {

    const { data, error } = useSWR<IUser[]>('/api/admin/users')
    
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if(data){ 
            setUsers(data);
        }
    }, [data]);


    const onRoleUpdate = async (userId: string, newRole: string) => {
        
        const previousUsers = users.map((user) => ({...user}));
        
        const updatedUsers = users.map((user) => ({
            ...user,
            role: userId===user._id ? newRole : user.role,
        }));

        setUsers(updatedUsers as IUser[]);

        try {
            await tesloApi.put(`/admin/users`, { userId, role: newRole});
            
        } catch (error) {
            console.log({error});
            setUsers(previousUsers);
        }
    }
    
    const columns: GridColDef[] = [
        {field: 'email', headerName: 'Email', width: 300},
        {field: 'name', headerName: 'Name', width: 300},
        {
            field: 'role', 
            headerName: 'Role', 
            width: 300,
            renderCell({row}: GridRenderCellParams) {
                return (
                    <Select
                        value={row.role}
                        label='Role'
                        onChange={({ target })=> onRoleUpdate(row.id, target.value)}
                        sx={{width: '300px'}}
                        >
                        <MenuItem value='client'>Client</MenuItem>
                        <MenuItem value='admin'>Admin</MenuItem>

                    </Select>
                )
            }
        },
    ];

    
    if(!data && !error) return <FullScreenLoading/>
    
    const rows = users.map((user) => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
    }))



    return (
        <AdminLayout
                title={'Users'}
                subtitle={'Users Management'}
                icon={<PeopleOutline sx={{ fontSize: 35, mt: .6 }}/>}
            >

            <Grid container >
                <Grid item xs={ 12 } className='fadeIn' sx={{m:'20px auto', height:'500px', width:'100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                </Grid>
            </Grid>


                
        </AdminLayout>
    )
}

export default Users;
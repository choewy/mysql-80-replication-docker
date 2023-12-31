# MySQL8.0 Replication Docker

- Run

```zsh
docker-compose up --build -d
```

- Start Replica

```sql
-- mysql80 slave(172.5.0.3)

START REPLICA USER='repl' PASSWORD='';
```

- Show Replica Status

```sql
SHOW REPLICA STATUS;
```

```json
{
  "Replica_IO_State": "Waiting for source to send event",
  "Source_Host": "172.5.0.2",
  "Source_User": "repl",
  "Source_Port": 3306,
  "Connect_Retry": 60,
  "Source_Log_File": "mysql-bin.000003",
  "Read_Source_Log_Pos": 157,
  "Relay_Log_File": "4cb45b0b8afc-relay-bin.000003",
  "Relay_Log_Pos": 326,
  "Relay_Source_Log_File": "mysql-bin.000003",
  "Replica_IO_Running": "Yes",
  "Replica_SQL_Running": "Yes",
  "Replicate_Do_DB": "",
  "Replicate_Ignore_DB": "",
  "Replicate_Do_Table": "",
  "Replicate_Ignore_Table": "",
  "Replicate_Wild_Do_Table": "",
  "Replicate_Wild_Ignore_Table": "",
  "Last_Errno": 0,
  "Last_Error": "",
  "Skip_Counter": 0,
  "Exec_Source_Log_Pos": 157,
  "Relay_Log_Space": 723,
  "Until_Condition": "None",
  "Until_Log_File": "",
  "Until_Log_Pos": 0,
  "Source_SSL_Allowed": "No",
  "Source_SSL_CA_File": "",
  "Source_SSL_CA_Path": "",
  "Source_SSL_Cert": "",
  "Source_SSL_Cipher": "",
  "Source_SSL_Key": "",
  "Seconds_Behind_Source": 0,
  "Source_SSL_Verify_Server_Cert": "No",
  "Last_IO_Errno": 0,
  "Last_IO_Error": "",
  "Last_SQL_Errno": 0,
  "Last_SQL_Error": "",
  "Replicate_Ignore_Server_Ids": "",
  "Source_Server_Id": 1,
  "Source_UUID": "797aaa63-60df-11ee-a723-0242ac050002",
  "Source_Info_File": "mysql.slave_master_info",
  "SQL_Delay": 0,
  "SQL_Remaining_Delay": null,
  "Replica_SQL_Running_State": "Replica has read all relay log; waiting for more updates",
  "Source_Retry_Count": 86400,
  "Source_Bind": "",
  "Last_IO_Error_Timestamp": "",
  "Last_SQL_Error_Timestamp": "",
  "Source_SSL_Crl": "",
  "Source_SSL_Crlpath": "",
  "Retrieved_Gtid_Set": "",
  "Executed_Gtid_Set": "",
  "Auto_Position": 0,
  "Replicate_Rewrite_DB": "",
  "Channel_Name": "",
  "Source_TLS_Version": "",
  "Source_public_key_path": "",
  "Get_Source_public_key": 0,
  "Network_Namespace": ""
}
```

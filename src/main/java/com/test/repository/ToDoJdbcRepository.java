package com.test.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.test.model.ToDoModel;

@Repository
public class ToDoJdbcRepository {

  @Autowired
  private JdbcTemplate template;
  private static final String STATUS_QUERY = "select * from todo where status=%d";
  private static final String ALL_QUERY = "select * from todo";
  private static final String INSERT_QUERY="insert into todo(task_name,status) values(\'%s\',%d)";
  private static final String UPDATE_TASK_STATUS_QUERY="update todo set status=%d where task_name=\'%s\'";
  private static final String DELETE_TASK="delete from todo where task_name=\'%s\'";
  
  public List<ToDoModel> findByStatus(int status){
    return template.query(String.format(STATUS_QUERY, status), getRowMapper());    
  }
  public List<ToDoModel> findAll(){    
    return template.query(ALL_QUERY, getRowMapper());
    
  }
  public void insertRow(String task, int status){
    template.execute(String.format(INSERT_QUERY, task,status));
  }
  public void updateTaskStatus(String task,int status){
    template.execute(String.format(UPDATE_TASK_STATUS_QUERY, status,task));
  }
  public void deleteTask(String task){
    template.execute(String.format(DELETE_TASK, task));
  }
  public RowMapper<ToDoModel> getRowMapper(){
    return new RowMapper<ToDoModel>(){

      @Override
      public ToDoModel mapRow(ResultSet rs, int arg1) throws SQLException {
        ToDoModel model = new ToDoModel();
        model.setTaskName(rs.getString("task_name"));
        model.setStatus(rs.getInt("status"));
        return model;
      }
      
    };
  }
}

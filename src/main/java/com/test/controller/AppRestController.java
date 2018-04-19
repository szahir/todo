package com.test.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.test.model.ToDoModel;
import com.test.repository.ToDoJdbcRepository;

@RestController
@RequestMapping("/api")
public class AppRestController {
  @Autowired
  private ToDoJdbcRepository repository;
  
  @RequestMapping(value = "/tasks/all", method = RequestMethod.GET)
  public @ResponseBody List<ToDoModel> getAllTasks(){
    return repository.findAll();
  }
  @RequestMapping(value = "/task/save", method = RequestMethod.POST)
  public void saveTask(@RequestBody ToDoModel model){
    repository.insertRow(model.getTaskName(), model.getStatus());
  }
  @RequestMapping(value = "/task/update", method = RequestMethod.POST)
  public void updateTask(@RequestBody ToDoModel model){
    repository.updateTaskStatus(model.getTaskName(), model.getStatus());
  }
  @RequestMapping(value = "/task/delete", method = RequestMethod.POST)
  public void deleteTask(@RequestBody ToDoModel model){
    repository.deleteTask(model.getTaskName());
  }
}

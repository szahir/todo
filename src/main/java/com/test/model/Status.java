package com.test.model;

public enum Status {
  PENDING(0),
  COMPLETED(1);
  private int value;
  private Status(int value){
    this.value = value;
  }
  
  public int getValue() {
    return value;
  }

}

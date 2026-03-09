cmake_minimum_required(VERSION 4.1)
project(01_HashTable C)

set(CMAKE_C_STANDARD 11)

include_directories(.)

add_executable(01_HashTable
        HashTable.c
        HashTable.h
        KeyValuePair.h
        main.c)

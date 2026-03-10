cmake_minimum_required(VERSION 4.1)
project(PreAlgebra C)

set(CMAKE_C_STANDARD 11)

include_directories(.)

add_executable(PreAlgebra
        divisor.c
        divisor.h
        main.c
        utils/quicksort.h
        utils/quicksort.c
)

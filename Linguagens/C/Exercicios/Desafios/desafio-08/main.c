

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "gerador.h"
#include "funcionario.h"



int main(){

    Funcionario *f = malloc(sizeof(Funcionario));
    int n = 100000;
    FILE *db = createDB();

    

    gerador(db, n); 



    free(f);
    f = NULL;
    closeDB(db);

    return 0;
}
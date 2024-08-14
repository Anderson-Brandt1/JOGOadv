#include <stdio.h>
#include <locale.h>
#include <time.h>
#include <stdlib.h>

int main() {
    setlocale(LC_ALL, "portuguese");
    int fase = 1;
    int nivel = 20;
    int chute, random; 
    srand(time(0));
    do {
        printf("\n########################################");
        printf("\n######### JOGO DA ADIVINHAÇÃO ##########");
        printf("\n########################################\n");
        
// Escolha da dificuldade
        int dificul;
        int vidas_iniciais, placar=0;

        do {
            printf("\nEscolha o nível de dificuldade: \n");
            printf("1- Insano (1 tentativa)\n");
            printf("2- Difícil (2 tentativas)\n");
            printf("3- Médio (3 tentativas)\n");
            printf("4- Fácil (4 tentativas)\n");
            printf("5- Noob Master (5 tentativas)\n");
            scanf("%d", &dificul);
// Define o número de vidas inicial
// Ajusta vidas_iniciais com base na dificuldade
            switch (dificul) {
                case 1:
                    vidas_iniciais = 1;
                    break;
                case 2:
                    vidas_iniciais = 2;
                    break;
                case 3:
                    vidas_iniciais = 3;
                    break;
                case 4:
                    vidas_iniciais = 4;
                    break;
                case 5:
                    vidas_iniciais = 5;
                    break;
                default:
                    printf("Opção inválida, tente novamente.\n");
            }
           }     while (dificul < 1 || dificul > 5);
                 int vidas = vidas_iniciais;  
// Início do jogo
            do {
            int tentativa = dificul;
            random = (rand() % nivel) + 1;
            int x = 0;
            printf("\nVidas: %d | Fase %d\n", vidas, fase);
            do {
                printf("Digite um número entre 1 e %d : \n", nivel);
                scanf("%d", &chute);
                if (chute == random) {
                  printf("\n########################################\n");
                  printf("Parabéns!\n");
                  printf("########################################\n");
                    placar = placar+ (fase*100);
                    tentativa = dificul;
                    fase++;
// Aumenta o nível de acordo com a fase
                    nivel += 20; 
                    vidas = vidas_iniciais;
                   break;
                }  else {
                    printf("\nErrado!\n\n");
                     if (chute > random) {
                      printf("Seu chute foi maior que o número secreto!\n");
                    } else {
                      printf("Seu chute foi menor que o número secreto!\n");
                    }
                         tentativa--;
                         vidas--;
                         if (vidas == 0) {
                         printf("Você perdeu todas as vidas.\nFim de jogo!\n");  
                         if (chute != random) {
                         printf("O número secreto era: %d\n\n", random);
                         printf("#########################################\n");
                         printf("Você chegou a fase   ||     %d      ||\n",fase);
                         printf("Sua pontuação foi de ||%d pontos  ||\n", placar);
                         printf("#########################################");
                         printf("\nFIM!");
                    }
                         return 0;
                  }
                          printf("Você ainda possui %d vidas\n", vidas);
                          x++;
               }
            }             while (x < dificul);
        }                 while (fase <= 5);
                       printf("Parabéns, você concluiu todas as fases!\n");
                       printf("#########################################\n");
                       printf("Você chegou a fase   ||     %d      ||\n",fase);
                       printf("Sua pontuação foi de ||%d pontos  ||\n", placar);
                       printf("#########################################");
                       printf("\nFIM!");
    }                  while (fase <= 5);
                       return 0;
}
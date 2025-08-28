#include <iostream>
#include <vector>
#include <chrono>

struct Particula { float x, y, z; };
const int NUM_PARTICULAS = 1000000;

int main() {
    // --- 1. MÉTODO LENTO: new a cada iteração ---
    auto inicio_lento = std::chrono::high_resolution_clock::now();
    for (int i = 0; i < NUM_PARTICULAS; ++i) {
        Particula* p = new Particula();
        delete p;
    }
    auto fim_lento = std::chrono::high_resolution_clock::now();
    std::cout << "Tempo LENTO (new/delete): " 
              << std::chrono::duration<double, std::milli>(fim_lento - inicio_lento).count() << " ms\n";

    // --- 2. MÉTODO RÁPIDO: std::vector com reserve ---
    auto inicio_rapido = std::chrono::high_resolution_clock::now();
    std::vector<Particula> vetor_particulas;
    vetor_particulas.reserve(NUM_PARTICULAS);
    for (int i = 0; i < NUM_PARTICULAS; ++i) {
        vetor_particulas.push_back({});
    }
    auto fim_rapido = std::chrono::high_resolution_clock::now();
    std::cout << "Tempo RAPIDO (vector.reserve): " 
              << std::chrono::duration<double, std::milli>(fim_rapido - inicio_rapido).count() << " ms\n";

    // --- 3. MÉTODO ULTRA-RÁPIDO: Simulando um Alocador de Pilha ---
    auto inicio_arena = std::chrono::high_resolution_clock::now();
    
    // Alocamos a memória UMA VEZ, como se fosse nossa Arena.
    std::vector<Particula> arena(NUM_PARTICULAS); 
    int particulas_alocadas = 0;

    for (int i = 0; i < NUM_PARTICULAS; ++i) {
        if (particulas_alocadas < NUM_PARTICULAS) {
            // "Alocar" é apenas pegar o próximo objeto já existente e incrementar um contador.
            // Esta é a operação mais rápida possível. Custo praticamente zero.
            Particula& p = arena[particulas_alocadas];
            particulas_alocadas++;
            // (aqui usaríamos a partícula 'p')
        }
    }
    auto fim_arena = std::chrono::high_resolution_clock::now();
    std::cout << "Tempo ULTRA-RAPIDO (Arena simulada): " 
              << std::chrono::duration<double, std::milli>(fim_arena - inicio_arena).count() << " ms\n";

    return 0;
}
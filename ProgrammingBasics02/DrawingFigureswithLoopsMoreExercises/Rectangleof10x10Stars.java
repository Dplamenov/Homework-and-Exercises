package DrawingFigureswithLoopsMoreExercises;

import java.util.Scanner;

public class Rectangleof10x10Stars {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String star = "*";
        for (int i = 1; i <= 10; i++) {
            for (int j = 1; j <= 10; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}

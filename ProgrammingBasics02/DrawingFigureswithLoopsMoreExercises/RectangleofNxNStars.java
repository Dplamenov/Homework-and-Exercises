package DrawingFigureswithLoopsMoreExercises;

import java.util.Scanner;

public class RectangleofNxNStars {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String star = "*";
        int n = Integer.parseInt(scanner.nextLine());
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}

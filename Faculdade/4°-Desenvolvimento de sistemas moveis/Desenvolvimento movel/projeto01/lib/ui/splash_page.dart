import 'package:flutter/material.dart';

class SplashPage extends StatelessWidget {
  const SplashPage ({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(child: Container(
      padding: EdgeInsets.all(16),
      color: Colors.indigo,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text("Texto1"),
          Text("Texto2"),
          Text("Texto3"),
        ],
      ),
    ));
  }
}

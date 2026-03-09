

import 'package:flutter/material.dart';
import 'package:projeto01/ui/splash_page.dart';

void main(){
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    title: "Projeto 01 - Splash",
    theme: ThemeData(
      useMaterial3: true,
    ),
    home: SplashPage(),
  ));
}
package com.example.lab1layout

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.kotlincompose.R

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MyApp()
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Preview
@Composable
fun MyApp() {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Example 1 Kotlin + Composer", color = Color.White, fontSize = 20.sp) },
                colors = TopAppBarDefaults.smallTopAppBarColors(containerColor = Color(0xFF00796B))
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .padding(padding)
                .fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Spacer(modifier = Modifier.height(16.dp))

            Image(
                painter = painterResource(id = R.drawable.image),
                contentDescription = "test",
                modifier = Modifier
                    .size(200.dp)
                    .padding(16.dp)
            )

            Spacer(modifier = Modifier.height(24.dp))
            Row() {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Button(onClick = {}, modifier = Modifier.padding(4.dp)) { Text("BUTTON") }
                    Button(onClick = {}, modifier = Modifier.padding(4.dp)) { Text("BUTTON") }
                }
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Button(onClick = {}, modifier = Modifier.padding(4.dp)) { Text("BUTTON") }
                    Button(onClick = {}, modifier = Modifier.padding(4.dp)) { Text("BUTTON") }
                }
            }


            Spacer(modifier = Modifier.height(24.dp))

            var textFieldValue by remember { mutableStateOf(TextFieldValue("")) }
            OutlinedTextField(
                value = textFieldValue,
                onValueChange = { textFieldValue = it },
                label = { Text("Email") },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 32.dp)
            )
        }
    }
}

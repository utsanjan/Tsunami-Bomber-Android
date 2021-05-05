package com.dopesatan.tsunami;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.os.Handler;
import android.text.Html;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    private WebView mywebView;
    RelativeLayout relativeLayout;
    RelativeLayout overlay_relative;
    Button btnNoInternetConnection;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mywebView=(WebView) findViewById(R.id.webview);
        mywebView.setWebViewClient(new WebViewClient());
        btnNoInternetConnection = (Button) findViewById(R.id.btnNoConnection);
        relativeLayout = (RelativeLayout) findViewById(R.id.relativeLayout);
        overlay_relative = (RelativeLayout) findViewById(R.id.overlay_relative);
        checkConnection();
        mywebView.loadUrl("https://cutt.ly/eyJ2IjoiMC4wLjEiLCJlIjoia1lyVDQwdTJheHlVMkpFVUZHMUE1aS9BM1htaUJnSkJMb09qcXQxMHRRSUNZY281ZXlFalZPZ0xkZ2JEZXk1VkNnZGMzUT09IiwiaCI6ImFzcmd2YWVzcmdldGdldCIsInMiOiI3NW0yVHJtNldrYlZLWFhIamM2ZTZBPT0iLCJpIjoieFVMWEFJejJESWUwaFgvUCJ9");
        WebSettings webSettings=mywebView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        btnNoInternetConnection.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                checkConnection();
                Toast.makeText(MainActivity.this, "Connecting to services...", Toast.LENGTH_LONG).show();
            }
        });
    }
    public class mywebClient extends WebViewClient{
        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon){
            super.onPageStarted(view,url,favicon);
        }
        @Override
        public boolean shouldOverrideUrlLoading(WebView view,String url){
            view.loadUrl(url);
            return true;
        }
    }
    @Override
    public void onBackPressed(){
        if(mywebView.canGoBack()) {
            mywebView.goBack();
        }
        else{
            super.onBackPressed();
        }
    }


    public void checkConnection() {
        ConnectivityManager connectivityManager = (ConnectivityManager)
                this.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo wifi = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
        NetworkInfo mobileNetwork = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE);

        if(wifi.isConnected()){
            mywebView.loadUrl("https://cutt.ly/eyJ2IjoiMC4wLjEiLCJlIjoia1lyVDQwdTJheHlVMkpFVUZHMUE1aS9BM1htaUJnSkJMb09qcXQxMHRRSUNZY281ZXlFalZPZ0xkZ2JEZXk1VkNnZGMzUT09IiwiaCI6ImFzcmd2YWVzcmdldGdldCIsInMiOiI3NW0yVHJtNldrYlZLWFhIamM2ZTZBPT0iLCJpIjoieFVMWEFJejJESWUwaFgvUCJ9");
            mywebView.setVisibility(View.VISIBLE);
            relativeLayout.setVisibility(View.GONE);
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    overlay_relative.setVisibility(View.GONE);
                }
            }, 10000);
            Toast.makeText(MainActivity.this, "Welcome to Tsunami", Toast.LENGTH_LONG).show();
        }
        else if(mobileNetwork.isConnected()){
            mywebView.loadUrl("https://cutt.ly/eyJ2IjoiMC4wLjEiLCJlIjoia1lyVDQwdTJheHlVMkpFVUZHMUE1aS9BM1htaUJnSkJMb09qcXQxMHRRSUNZY281ZXlFalZPZ0xkZ2JEZXk1VkNnZGMzUT09IiwiaCI6ImFzcmd2YWVzcmdldGdldCIsInMiOiI3NW0yVHJtNldrYlZLWFhIamM2ZTZBPT0iLCJpIjoieFVMWEFJejJESWUwaFgvUCJ9");
            mywebView.setVisibility(View.VISIBLE);
            relativeLayout.setVisibility(View.GONE);
            new Handler().postDelayed(new Runnable() {
                @Override
                public void run() {
                    overlay_relative.setVisibility(View.GONE);
                }
            }, 10000);
            Toast.makeText(MainActivity.this, "Welcome to Tsunami", Toast.LENGTH_LONG).show();
        }
        else{
            overlay_relative.setVisibility(View.VISIBLE);
            mywebView.setVisibility(View.GONE);
            relativeLayout.setVisibility(View.VISIBLE);
        }
    }
}
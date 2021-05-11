package com.dopesatan.tsunami;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.net.Uri;
import android.os.Bundle;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView mywebView;
    RelativeLayout relativeLayout;
    RelativeLayout overlay_relative;
    Button btnNoInternetConnection;

    public class WebViewTouchListener implements View.OnTouchListener {
        private float downX;

        @Override
        public boolean onTouch(final View v, final MotionEvent event) {
            if (event.getPointerCount() > 1) {
                //multi touch
                return true;
            }

            switch (event.getAction()) {
                case MotionEvent.ACTION_DOWN:
                    downX = event.getX();
                    break;
                case MotionEvent.ACTION_MOVE:
                case MotionEvent.ACTION_CANCEL:
                case MotionEvent.ACTION_UP:
                    // set x so that it doesn't move
                    event.setLocation(downX, event.getY());
                    break;
            }
            return false;
        }
    }

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
        mywebView.setHorizontalScrollBarEnabled(false);
        mywebView.setOnTouchListener(new WebViewTouchListener());
        mywebView.setHapticFeedbackEnabled(false);

        mywebView.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                return true;
            }
        });
        mywebView.setLongClickable(false);

        btnNoInternetConnection.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                checkConnection();
                Toast.makeText(MainActivity.this, "Connecting to services...", Toast.LENGTH_LONG).show();
            }
        });

        mywebView.setWebChromeClient(new WebChromeClient() {
            public void onProgressChanged(WebView view, int progress) {
                if (progress == 100) {
                    overlay_relative.setVisibility(View.GONE);
                }
            }
        });

        mywebView.setWebViewClient(new WebViewClient() {
            public void onReceivedError(WebView webView, int errorCode, String description, String failingUrl) {
                try {
                    webView.stopLoading();
                } catch (Exception e) {
                }

                if (webView.canGoBack()) {
                    webView.goBack();
                }

                webView.loadUrl("about:blank");
                relativeLayout.setVisibility(View.VISIBLE);
                super.onReceivedError(webView, errorCode, description, failingUrl);
            }
        });
    }

    public void left (View view) {
        Intent web = new Intent(Intent.ACTION_VIEW, Uri.parse(
                "https://www.buymeacoffee.com/utsanjan"
        ));
        Toast.makeText(MainActivity.this, "Buy me a coffee :)", Toast.LENGTH_LONG).show();
        startActivity(web);
    }

    public void right (View view) {
        Intent web = new Intent(Intent.ACTION_VIEW, Uri.parse(
                "https://github.com/utsanjan/Tsunami-Bomber-Android/releases"
        ));
        Toast.makeText(MainActivity.this, "Checking for updates...", Toast.LENGTH_LONG).show();
        startActivity(web);
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
    public void onBackPressed() { }

    public void checkConnection() {
        ConnectivityManager connectivityManager = (ConnectivityManager)
                this.getSystemService(Context.CONNECTIVITY_SERVICE);
        NetworkInfo wifi = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
        NetworkInfo mobileNetwork = connectivityManager.getNetworkInfo(ConnectivityManager.TYPE_MOBILE);

        if(wifi.isConnected()){
            mywebView.loadUrl("https://cutt.ly/eyJ2IjoiMC4wLjEiLCJlIjoia1lyVDQwdTJheHlVMkpFVUZHMUE1aS9BM1htaUJnSkJMb09qcXQxMHRRSUNZY281ZXlFalZPZ0xkZ2JEZXk1VkNnZGMzUT09IiwiaCI6ImFzcmd2YWVzcmdldGdldCIsInMiOiI3NW0yVHJtNldrYlZLWFhIamM2ZTZBPT0iLCJpIjoieFVMWEFJejJESWUwaFgvUCJ9");
            mywebView.setVisibility(View.VISIBLE);
            relativeLayout.setVisibility(View.GONE);
            overlay_relative.setVisibility(View.VISIBLE);
            Toast.makeText(MainActivity.this, "Loading Tsunami", Toast.LENGTH_LONG).show();
        }
        else if(mobileNetwork.isConnected()){
            mywebView.loadUrl("https://cutt.ly/eyJ2IjoiMC4wLjEiLCJlIjoia1lyVDQwdTJheHlVMkpFVUZHMUE1aS9BM1htaUJnSkJMb09qcXQxMHRRSUNZY281ZXlFalZPZ0xkZ2JEZXk1VkNnZGMzUT09IiwiaCI6ImFzcmd2YWVzcmdldGdldCIsInMiOiI3NW0yVHJtNldrYlZLWFhIamM2ZTZBPT0iLCJpIjoieFVMWEFJejJESWUwaFgvUCJ9");
            mywebView.setVisibility(View.VISIBLE);
            relativeLayout.setVisibility(View.GONE);
            overlay_relative.setVisibility(View.VISIBLE);
            Toast.makeText(MainActivity.this, "Loading Tsunami", Toast.LENGTH_LONG).show();
        }
        else{
            overlay_relative.setVisibility(View.GONE);
            mywebView.setVisibility(View.GONE);
            relativeLayout.setVisibility(View.VISIBLE);
        }
    }
}
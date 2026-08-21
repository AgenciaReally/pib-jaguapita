import http.server
import socketserver
import os

PORT = 9090

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        path_without_query = self.path.split('?')[0]
        if path_without_query != '/' and not os.path.exists('.' + path_without_query):
            if os.path.exists('.' + path_without_query + '.html'):
                query = '?' + self.path.split('?')[1] if '?' in self.path else ''
                self.path = path_without_query + '.html' + query
        return super().do_GET()

socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), CleanURLHandler) as httpd:
    print(f"Serving Clean URLs on port {PORT}")
    httpd.serve_forever()

import re

def convert_to_jsx(html):
    # replace class= with className=
    html = html.replace('class="', 'className="')
    # replace inline styles
    html = html.replace("style=\"font-variation-settings: 'FILL' 1;\"", "style={{fontVariationSettings: \"'FILL' 1\"}}")
    # replace svg attributes
    html = html.replace('stroke-width=', 'strokeWidth=')
    html = html.replace('stroke-dasharray=', 'strokeDasharray=')
    html = html.replace('stroke-dashoffset=', 'strokeDashoffset=')
    # replace HTML comments with JSX comments
    html = re.sub(r'<!--(.*?)-->', r'{/*\1*/}', html, flags=re.DOTALL)
    
    # extract body inner html
    match = re.search(r'<body[^>]*>(.*)</body>', html, re.DOTALL)
    if match:
        html = match.group(1)
    
    # fix self closing tags just in case
    html = re.sub(r'<input([^>]*[^/])>', r'<input\1 />', html)
    return html

def main():
    with open('search.html', 'r', encoding='utf-8') as f:
        search_html = f.read()
    with open('dashboard.html', 'r', encoding='utf-8') as f:
        dashboard_html = f.read()
    
    search_jsx = convert_to_jsx(search_html)
    dashboard_jsx = convert_to_jsx(dashboard_html)
    
    with open('newslens-ui/app/page.tsx', 'w', encoding='utf-8') as f:
        f.write('export default function SearchPage() {\n  return (\n    <>\n')
        f.write(search_jsx)
        f.write('\n    </>\n  );\n}\n')
        
    import os
    os.makedirs('newslens-ui/app/dashboard', exist_ok=True)
    with open('newslens-ui/app/dashboard/page.tsx', 'w', encoding='utf-8') as f:
        f.write('export default function DashboardPage() {\n  return (\n    <>\n')
        f.write(dashboard_jsx)
        f.write('\n    </>\n  );\n}\n')

if __name__ == '__main__':
    main()

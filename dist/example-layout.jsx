import { ClientBody } from './components/ClientBody';
export default function RootLayout(_a) {
    var children = _a.children;
    return (<html lang="en">
      <ClientBody>{children}</ClientBody>
    </html>);
}

import * as taos from "@tdengine/websocket";

const url = "http://localhost:6041";
const username = "root";
const password = "taosdata";
const SQL = "select * from test.meters limit 1000";

export async function createConnect() {
    let conn = null;
    try {
        let conf = new taos.WSConfig(url);
        conf.setUser(username);
        conf.setPwd(password);
        console.log(`Connecting to ${url}`);
        conn = await taos.sqlConnect(conf);
        console.log(conn);
        const res = await conn.exec(SQL);
        console.log("res", res);
    } catch (err) {
        throw err;
    } finally {
        if (conn) {
            await conn.close();
        }
    }
}

createConnect();
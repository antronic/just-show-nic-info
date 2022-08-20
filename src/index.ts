require('dotenv').config()

import express from 'express'
import { networkInterfaces } from 'os'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 3000

const nic = process.env.NIC || 'eth0'

app.set('view engine', 'pug')

function listServerNics() {
  const nets = networkInterfaces()
  const nics: { nic: string; nicInfo: string; address: string; family: "IPv4" | "IPv6" }[] = []

  Object.keys(nets).forEach((_nic, index) => {
    nets[_nic]?.forEach((info) => {
      nics.push({
        nic: _nic,
        nicInfo: _nic + '-' + index,
        address: info.address,
        family: info.family,
      })
    })
  })

  console.table(nics)
}

function getServerIps() {
  const nets = networkInterfaces()

  return nets[nic]?.map((_nic) => _nic.address)
}

app.get('/', (req: express.Request, res: express.Response) => {
  res.render(path.join(__dirname, '../views/index'), { ips: getServerIps(), nic })
})

app.listen(PORT, () => {
  listServerNics()

  console.log('App is listening on', PORT)
})
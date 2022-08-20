import express from 'express'
import { networkInterfaces } from 'os'
import path from 'path'

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'pug')

function listServerNics() {
  const nets = networkInterfaces()
  const nics: { nic: string; nicInfo: string; address: string; family: "IPv4" | "IPv6" }[] = []

  Object.keys(nets).forEach((nic, index) => {
    // console.log('nets?[nic]', nets[nic])
    nets[nic]?.forEach((info) => {
      // console.log(inf)
      nics.push({
        nic: nic,
        nicInfo: nic + '-' + index,
        address: info.address,
        family: info.family,
      })
    })
  })

  console.table(nics)
  // console.log(nets)
}

function getServerIps() {
  const nets = networkInterfaces()

  return nets.en0?.map((nic) => nic.address)
}

app.get('/', (req: express.Request, res: express.Response) => {
  res.render(path.join(__dirname, '../views/index'), { ips: getServerIps() })
})

app.listen(PORT, () => {
  listServerNics()

  console.log('App is listening on', PORT)
})
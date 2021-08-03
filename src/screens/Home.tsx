import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import equal from 'fast-deep-equal'
import { RingLoader } from 'react-spinners'

import { DoughnutChart } from '../components'
import { addLogs } from '../redux/actions'
import constants from '../utils/constants'
import { UserInterface } from '../types/UserInterface'

interface Props {
  user: UserInterface,
  logs?: any
}

const Home: React.FunctionComponent<Props> = (props: Props) => {
  const [totals, setTotals] = useState<Array<any>>([])
  const [intensityTotals, setIntensityTotals] = useState<{ [key: string]: { label: string, value: number }[] }>({ high: [{ label: 'High', value: 0 }], medium: [{ label: 'Medium', value: 0 }], light: [{ label: 'Light', value: 0 }]})
  const [totalByIntensities, setTotalByIntensities] = useState<Array<any>>([])
  const [inComboIntensities, setInComboIntensities] = useState<Array<any>>([])
  const [updatedUser, setUpdatedUser] = useState<boolean>(false)
  const [empty, setEmpty] = useState<boolean>(false)

  const prevUserRef = useRef<any>()

  useEffect(() => {
    prevUserRef.current = props.user
  })

  console.log(props)

  /*componentDidUpdate(prevProps) {
    let { user, logs } = this.props;
    let { updatedUser } = this.state;
    if (!equal(user, prevProps.user) || equal(logs, {})) {
      this.getData();
    }

  }*/


  const getData = () => {
    let { user } = props
    if (!user) return
    let url = constants.getDataUrl
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: user.uid })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson.status === 'empty')
          setEmpty(true)
        else
          editData(responseJson.logs.totals, responseJson.logs.intensityTotals)
      })
      .catch(err => console.error(err));

  }
  const filterOption = (option: string) => {
    switch (option) {
      case 'sprint':
        return 'Sprint'
      case 'km1':
        return '1 km tempo'
      case 'km2':
        return '2 km tempo'
      case 'km5':
        return '5 km tempo'
      case 'km10':
        return '10 km tempo'
      case 'hm':
        return 'Half-marathon tempo'
      case 'm':
        return 'Marathon tempo'
      case 'easy':
        return 'Easy tempo'
      case 'warmup':
        return 'Warmup'
      case 'mainpart':
        return 'Main Part'
      case 'cooldown':
        return 'Cool Down'
      default:
        return ''
    }
  }

  const editData = (mapa: { [key: string]: number }, intensities: { inCombo: { light: number, medium: number, high: number }, highIntensity: { value: number }, mediumIntensity: { value: number }, lightIntensity: { value: number } }) => {
    let inCombo = intensities.inCombo
    let arr = []
    let total = 0
    for (let [key, value] of Object.entries(mapa)) {
      arr.push({ label: filterOption(key), value });
      total += value
    }
    let high = [], highTotal = 0;
    for (let [key, value] of Object.entries(intensities.highIntensity)) {
      high.push({ label: filterOption(key), value })
      highTotal += value
    }
    let medium = [], mediumTotal = 0;
    for (let [key, value] of Object.entries(intensities.mediumIntensity)) {
      medium.push({ label: filterOption(key), value });
      mediumTotal += value;
    }
    let light = [], lightTotal = 0;
    for (let [key, value] of Object.entries(intensities.lightIntensity)) {
      light.push({ label: filterOption(key), value })
      lightTotal += value;
    }
    let inComboIntensitiesN = [{ label: 'Light', value: inCombo?.light }, { label: 'Medium', value: inCombo?.medium }, { label: 'High', value: inCombo.high }];
    let totalByIntensitiesN = [{ label: 'Light', value: lightTotal }, { label: 'Medium', value: mediumTotal }, { label: 'High', value: highTotal }];
    // props.addLogs({ totals: arr, intensityTotals: { high, medium, light }, total, totalByIntensities, inComboIntensities })
    setUpdatedUser(true)
    setTotals(arr)
    setIntensityTotals({ high, medium, light })
    setTotalByIntensities(totalByIntensitiesN)
    setInComboIntensities(inComboIntensitiesN)
    // setState({ updatedUser: true, totals: arr, intensityTotals: { high, medium, light }, total, totalByIntensities, inComboIntensities });
  }

  const min = (a: number, b: number) => {
    return a < b ? a : b;
  }
  let { user } = props
  /*let { totals, total, intensityTotals, totalByIntensities, inComboIntensities } = props.logs
  if (equal(props.logs, {})) {
    totals = []; total = 0; intensityTotals = []; totalByIntensities = []; inComboIntensities = [];
  }*/

  useEffect(() => {
    let { logs } = props
    console.log(totals)
    if (equal(logs, {})) {
      getData()
    }
  }, [])

  if (user === undefined) {
    let size = min(window.innerHeight * 0.6, window.innerWidth * 0.6)
    return (
      <div style={{ alignContent: 'center', width: size, paddingTop: '90px', marginLeft: (window.innerWidth - size) / 2 }}>
        <RingLoader size={size} />
      </div>
    )
  }


  else if (user === null) {
    return (
      <div style={{ paddingTop: '90px' }}>
        <p style={{ fontSize: '25px' }}>Please <Link to="/login">log in</Link></p>
      </div>
    );
  } else if (empty) {
    return <p>You don't have any trainings yet. Add them in <Link to="/input">Add</Link> tab.</p>
  }


  return (
    <div style={{ paddingTop: '90px', }}>
      <div>
        {totals.length !== 0 ? <DoughnutChart data={totalByIntensities} title="Total by Intensities" colors={["#1E555C", "#F4D8CD", "#EDB183"]} size={0.3} /> : <p></p>}
      </div>

      <div className="inline">
        <div className="inline">
          {totals.length !== 0 ? <DoughnutChart data={intensityTotals.high} title="High Intensity Total" colors={["#1E555C", "#F4D8CD", "#EDB183"]} size={0.25} /> : <p></p>}
        </div>
        <div className="inline">
          {totals.length !== 0 ? <DoughnutChart data={intensityTotals.medium} title="Medium Intensity Total" colors={["#0B4F6C", "#01BAEF", "#FBFBFF"]} size={0.25} /> : <p></p>}
        </div>
        <div className="inline">
          {totals.length !== 0 ? <DoughnutChart data={intensityTotals.light} title="Light Intensity Total" colors={["#eaed24", "#d97d14", "#eb2821"]} size={0.25} /> : <p></p>}
        </div>
      </div>
      <div className="inline">
        <div className="inline">
          {totals.length !== 0 ? <DoughnutChart data={totals} title="Total by Parts" colors={["#eaed24", "#d97d14", "#eb2821"]} size={0.25} /> : <p></p>}
        </div>
        <div className="inline">
          {totals.length !== 0 ? <DoughnutChart data={inComboIntensities} title="Intensities in combo" colors={["#1E555C", "#F4D8CD", "#EDB183"]} size={0.25} /> : <p></p>}
        </div>
        <div className="inline">
          {totals.length !== 0 ? <DoughnutChart data={intensityTotals.light} title="Light Intensity Total" colors={["#eaed24", "#d97d14", "#eb2821"]} size={0.25} /> : <p></p>}
        </div>
      </div>
    </div>
    
  )
}

const mapStateToProps = (state: any) => {
  return state
}

const mapDispatchToProps = {
  addLogs
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
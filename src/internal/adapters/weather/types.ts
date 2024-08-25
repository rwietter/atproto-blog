export interface Weather {
  HasPrecipitation: boolean
  WeatherIcon: number
  WeatherText: string
  Temperature: {
    Imperial: {
      Unit: 'F'
      UnitType: number
      Value: number
    }
    Metric: {
      Unit: 'C'
      UnitType: number
      Value: number
    }
  }
}

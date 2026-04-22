
class Incident:
    pass

class Route:
    def __init__(self, stops: list[str]):
        self.stops = stops

class Trip:
    def __init__(self, route: Route):
        self.route = route
        self.startTime = ""
        self.Incidents: list[Incident] = []
        
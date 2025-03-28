
function getRandomCentroids(k, points) {
    const centroids = [];
    for (let i = 0; i < k; i++) {
        const randomIndex = Math.floor(Math.random() * points.length);
        centroids.push(points[randomIndex]);
    }
    return centroids;
}

function assignPointsToCentroids(points, centroids) {
    return points.map(point => {
        let closestCentroidIndex = 0;
        let minDistance = Number.MAX_VALUE;
        centroids.forEach((centroid, index) => {
            const distance = getDistance(point, centroid);
            if (distance < minDistance) {
                minDistance = distance;
                closestCentroidIndex = index;
            }
        });
        return { ...point, centroidIndex: closestCentroidIndex };
    });
}
function getDistance(point1, point2) {
    return Math.sqrt(Math.pow(point1.lat - point2.lat, 2) + Math.pow(point1.lng - point2.lng, 2));
}

function recomputeCentroids(assignments, k) {
    const newCentroids = Array(k).fill(null).map(() => ({ lat: 0, lng: 0, count: 0 }));
    assignments.forEach(({ lat, lng, centroidIndex }) => {
        newCentroids[centroidIndex].lat += lat;
        newCentroids[centroidIndex].lng += lng;
        newCentroids[centroidIndex].count += 1;
    });
    return newCentroids.map(({ lat, lng, count }) => ({
        lat: lat / count,
        lng: lng / count
    }));
}
const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const fetchRoadRoute = async (waypoints) => {
    const coordinates = waypoints.map((point) => `${point.lng},${point.lat}`).join(";");
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.routes.length > 0) {
            return data.routes[0].geometry; // Road-following path
        }
    } catch (error) {
        console.error("Error fetching road-based route:", error);
    }

    return null;
};
export const optimizeDeliveryPath = async (k,deliveryPoints,userLocation)=>{
    if (!k || k <= 0) {
        alert('Please enter a valid number of clusters');
        return;
    }

    const clusters = kMeansClustering(deliveryPoints, k);
    let routes = [];
    console.log(clusters);

    for (let i = 0; i < k; i++) {
        const clusterPoints = clusters.filter(point => point.centroidIndex === i);
        const optimizedPath = solveTSP([userLocation, ...clusterPoints]);
        console.log(optimizedPath);
        const roadRoute = await fetchRoadRoute(optimizedPath);
        if (roadRoute) {
            routes.push({
                type: "Feature",
                properties: { color: getRandomColor() },
                geometry: roadRoute,
            });
        }
    }
    return {clusters,routes};
}
function kMeansClustering(points, k) {
    let centroids = getRandomCentroids(k, points);
    let assignments;
    for (let i = 0; i < 10; i++) { 
        assignments = assignPointsToCentroids(points, centroids);
        centroids = recomputeCentroids(assignments, k);
    }
    return assignments;
}



export const solveTSP = (points)=>{
    const n = points.length;
    if (n <= 1) return points;

    const visited = new Array(n).fill(false);
    const result = [points[0]];
    visited[0] = true;

    let current = points[0];

    for (let i = 1; i < n; i++) {
        let nextIndex = -1;
        let minDist = Infinity;

        for (let j = 0; j < n; j++) {
            if (!visited[j]) {
                const dist = getDistance(current, points[j]);
                if (dist < minDist) {
                    minDist = dist;
                    nextIndex = j;
                }
            }
        }

        if (nextIndex !== -1) {
            visited[nextIndex] = true;
            current = points[nextIndex];
            result.push(current);
        }
    }

    return result;
}

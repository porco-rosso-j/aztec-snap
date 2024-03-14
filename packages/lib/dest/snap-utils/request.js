import { defaultSnapOrigin } from '../constants';
export const request = async ({ method, params }) => {
    try {
        const data = (await window.ethereum?.request({
            method,
            params,
        })) ?? null;
        console.log('data: ', data);
        return data;
    }
    catch (requestError) {
        return null;
    }
};
export const requestSnap = async (snapId = defaultSnapOrigin, version) => {
    const snaps = (await request({
        method: 'wallet_requestSnaps',
        params: {
            [snapId]: { version },
        },
    }));
    console.log('snaps in requestSnap: ', snaps);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zbmFwLXV0aWxzL3JlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBSWpELE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBWSxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRTtJQUMzRCxJQUFJO1FBQ0YsTUFBTSxJQUFJLEdBQ1IsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDO1lBQzlCLE1BQU07WUFDTixNQUFNO1NBQ2EsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO1FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzVCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFBQyxPQUFPLFlBQWlCLEVBQUU7UUFDMUIsT0FBTyxJQUFJLENBQUM7S0FDYjtBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQzlCLE1BQU0sR0FBRyxpQkFBaUIsRUFDMUIsT0FBZ0IsRUFDaEIsRUFBRTtJQUNGLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUM7UUFDM0IsTUFBTSxFQUFFLHFCQUFxQjtRQUM3QixNQUFNLEVBQUU7WUFDTixDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFO1NBQ3RCO0tBQ0YsQ0FBQyxDQUF5QixDQUFDO0lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDL0MsQ0FBQyxDQUFDIn0=
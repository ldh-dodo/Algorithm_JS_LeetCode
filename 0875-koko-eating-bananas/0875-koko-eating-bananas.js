/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function(piles, h) {
    /**
    lowerbound로 k값 좁히기
    piles[i] <= k -> h += 1
    piles[i] > k -> h += Math.ceil(piles[i]/ k) 
    
    
    */

    let left = 1, right = 1000000001;
    let answer = null;

    const canEat = (k) => {
        let eatHour = 0;

        for(const pile of piles) {
            if(pile <= k) eatHour++;
            else eatHour += Math.ceil(pile / k); 
        }

        return eatHour <= h;
    }

    while(left < right) {
        const mid = Math.floor((left + right) / 2);
        console.log(mid);

        if(canEat(mid)) {
            right = mid;
            answer = mid;
        } else left = mid + 1;
    }

    return answer;
};
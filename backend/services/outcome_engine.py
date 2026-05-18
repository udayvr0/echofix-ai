import random


def determine_recovery_outcome(severity, confidence_score):

    """
    Adaptive orchestration outcome engine.
    Simulates realistic operational uncertainty.
    """

    base_success_rate = 0.45

    if severity == "HIGH":
        base_success_rate -= 0.15

    elif severity == "CRITICAL":
        base_success_rate -= 0.30

    if confidence_score < 70:
        base_success_rate -= 0.20

    elif confidence_score < 50:
        base_success_rate -= 0.35

    roll = random.random()

    success = roll <= base_success_rate

    return {
        "success": success,
        "success_rate": round(base_success_rate * 100, 2),
        "random_roll": round(roll * 100, 2)
    }